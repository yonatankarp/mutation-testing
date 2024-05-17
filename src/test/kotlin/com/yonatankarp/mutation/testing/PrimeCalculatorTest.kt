package com.yonatankarp.mutation.testing

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

class PrimeCalculatorTest {
    @Test
    fun `test is prime`() {
        assertFalse(PrimeCalculator.isPrime(1))
        assertTrue(PrimeCalculator.isPrime(2))
        assertTrue(PrimeCalculator.isPrime(3))
        assertFalse(PrimeCalculator.isPrime(4))
        assertTrue(PrimeCalculator.isPrime(5))
    }

    @Test
    fun `test generate primes`() {
        assertEquals(listOf(2, 3, 5), PrimeCalculator.generatePrimes(5))
        assertEquals(listOf(2, 3, 5, 7), PrimeCalculator.generatePrimes(10))
    }

    @Test
    fun `test factorial`() {
        assertEquals(1L, PrimeCalculator.factorial(0))
        assertEquals(120L, PrimeCalculator.factorial(5))
        assertThrows(IllegalArgumentException::class.java) {
            PrimeCalculator.factorial(-1)
        }
    }
}
