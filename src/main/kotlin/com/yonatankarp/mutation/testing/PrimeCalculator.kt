package com.yonatankarp.mutation.testing

import kotlin.math.sqrt

object PrimeCalculator {
    fun Int.isPrime(): Boolean =
        if (this <= 1) false
        else (2..sqrt(this.toDouble()).toInt()).all { this % it != 0 }
}
