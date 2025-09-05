const path = require("path");
const fs = require("fs");
const { getRandomUserService } = require("../services/usersService");
const { getCommentService } = require("../services/commentsService");
const { randomUUID } = require("crypto");

const FILES = fs
  .readdirSync(path.join("imgs-txts"), {
    withFileTypes: true,
    recursive: true,
  })
  .filter((f) => f.isFile());

const TEXT_TEMPLATE =
  "lorem ipsum dolor sit amet consectetur adipisicing elit. praesentium debitis dolore ea eum! animi consequuntur minima eum accusan tium, laboriosam molestias neque autem totam suscipit natus nemo labore, ut tenetur exercitationem.";

function formatPlainText(text) {
  return text
    .split(" ")
    .map((w) => {
      let res = w;
      if (Math.random() < 0.03) {
        res = `<i>${res}</i>`;
      }

      if (Math.random() < 0.03) {
        res = `<b>${res}</b>`;
      }

      if (Math.random() < 0.005) {
        res = res + "\n";
      }

      return res;
    })
    .join(" ");
}

function getRandomCodeBlock() {
  const codeBlocks = [
    `import random

# Generate a random integer between 1 and 10
random_number = random.randint(1, 10)
print(f"Random number: {random_number}")

# Simple function
def greet(name):
return f"Hello, {name}!"

print(greet("Alice"))`,
    `// Generate a random floating-point number between 0 (inclusive) and 1 (exclusive)
const randomNumber = Math.random();
console.log(\`Random number: \${randomNumber}\`);

// Array iteration
const fruits = ["apple", "banana", "cherry"];
fruits.forEach(fruit => {
console.log(fruit);
});`,
    `#include <iostream>
#include <cstdlib> // For rand() and srand()
#include <ctime>   // For time()

int main() {
// Seed the random number generator
srand(time(0)); 

// Generate a random integer between 1 and 100
int randomNum = rand() % 100 + 1; 
std::cout << "Random number: " << randomNum << std::endl;

return 0;
}`,
    `import java.util.Random;

public class RandomCode {
public static void main(String[] args) {
Random rand = new Random();

// Generate a random integer
int randomNumber = rand.nextInt(); 
System.out.println("Random integer: " + randomNumber);

// Conditional statement
int x = 15;
if (x > 10) {
System.out.println("x is greater than 10");
} else {
System.out.println("x is not greater than 10");
}
}
}`,
  ];

  return codeBlocks[Math.floor(Math.random() * codeBlocks.length)];
}

function getRandomLink() {
  const origins = [
    "google.com",
    "stackoverflow.com",
    "monkeytype.com",
    "linkedin.com",
    "netflix.com",
    "chatgpt.com",
  ];

  const randorigin = origins.sort(() => 2 * Math.random() - 1)[0];
  return `<a href="https://${randorigin}">${randorigin}</a>`;
}

const generateCommentsHelper = async (count = 1) => {
  const comments = [];
  for (let i = 0; i < count; i++) {
    let comment = {
      userId: "",
    };

    const user = await getRandomUserService();

    comment.userId = user.id;

    let generatedText = formatPlainText(TEXT_TEMPLATE);

    // additional texts
    let i = 0;
    while (Math.random() < 0.1 && i < 10) {
      if (Math.random() < 0.3) generatedText += getRandomLink(TEXT_TEMPLATE);
      if (Math.random() < 0.3) generatedText += formatPlainText(TEXT_TEMPLATE);
      if (Math.random() < 0.1) generatedText += "\n";
      if (Math.random() < 0.15) generatedText += getRandomCodeBlock();
      if (Math.random() < 0.05) generatedText += "\n";
      i++;
    }

    if (Math.random() < 0.75) {
      const replyTo = await getCommentService();
      if (replyTo?.commentId) {
        comment.replyTo = replyTo.commentId;
      }
    }

    comment.text = generatedText;

    let attachedFilePath;

    // attach file
    if (Math.random() < 0.4) {
      let generatedFile;

      if (Math.random() < 0.3) {
        const txtsFiles = FILES.filter((f) => f.name.match(/\.txt$/));
        generatedFile = txtsFiles[Math.floor(Math.random() * txtsFiles.length)];
      } else {
        const imgsFiles = FILES.filter((f) => !f.name.match(/\.txt$/));
        generatedFile = imgsFiles[Math.floor(Math.random() * imgsFiles.length)];
      }

      const ext = generatedFile.name.match(/\..*$/)[0];

      const rootPath = path.join(
        __dirname,
        "..",
        generatedFile.parentPath,
        generatedFile.name,
      );

      attachedFilePath = path.join(
        "files",
        ext.includes("txt") ? "txts" : "imgs",
        randomUUID() + ext,
      );

      comment.attachedFilePath = attachedFilePath;

      const destPath = path.join(__dirname, "..", attachedFilePath);

      fs.copyFileSync(rootPath, destPath);
    }

    comments.push(comment);
  }

  return comments;
};

async function generateUsersHelper(count = 1) {
  let data = await fetch(
    `https://randomuser.me/api/?inc=email,login&&results=${count}`,
  );
  data = await data.json();

  const users = data.results.map(({ email, login: { username } }) => ({
    email,
    username,
    homepage: Math.random() < 0.5 ? "https://linkedin.com" : undefined,
  }));

  return users;
}

module.exports = {
  generateCommentsHelper,
  generateUsersHelper,
};
