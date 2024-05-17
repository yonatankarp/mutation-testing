package com.yonatankarp.mutation.testing

import kotlin.math.sqrt

object PrimeCalculator {
    fun isPrime(num: Int): Boolean {
        if (num <= 1) return false
        for (i in 2..sqrt(num.toDouble()).toInt()) {
            if (num % i == 0) return false
        }
        return true
    }

    fun generatePrimes(limit: Int): List<Int> =
         (2..limit).filter { isPrime(it) }


    fun factorial(num: Int): Long {
        require(num >= 0) { "Number must be non-negative" }
        return (1..num).fold(1L) { acc, i -> acc * i }
    }
}
