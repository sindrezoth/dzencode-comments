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

module.exports = getRandomCodeBlock;
