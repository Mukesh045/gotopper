import math

def is_prime(n):
    """
    Checks if a given number is prime.

    Args:
        n: An integer.

    Returns:
        True if n is prime, False otherwise.
    """
    if n <= 1:
        return False  # Numbers less than or equal to 1 are not prime
    if n <= 3:
        return True   # 2 and 3 are prime
    if n % 2 == 0 or n % 3 == 0:
        return False  # Multiples of 2 or 3 are not prime (except 2 and 3 themselves)

    # Check for factors from 5 onwards, in steps of 6 (optimizes checking)
    # All primes greater than 3 can be expressed in the form 6k ± 1
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

# Example usage:
number_to_check = 29
if is_prime(number_to_check):
    print(f"{number_to_check} is a prime number.")
else:
    print(f"{number_to_check} is not a prime number.")

another_number = 15
if is_prime(another_number):
    print(f"{another_number} is a prime number.")
else:
    print(f"{another_number} is not a prime number."))