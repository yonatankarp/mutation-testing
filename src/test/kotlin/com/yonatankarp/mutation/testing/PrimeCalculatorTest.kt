package com.yonatankarp.mutation.testing

import com.yonatankarp.mutation.testing.PrimeCalculator.isPrime
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.Arguments
import org.junit.jupiter.params.provider.MethodSource

class PrimeCalculatorTest {
    @ParameterizedTest(name = "isPrime({0}) = {1}")
    @MethodSource("provideNumbers")
    fun `test isPrime`(number: Int, isPrime: Boolean) {
        assertEquals(isPrime, number.isPrime())
    }

    companion object {
        @JvmStatic
        fun provideNumbers() = listOf(
            Arguments.of(Int.MIN_VALUE, false),
            Arguments.of(-1, false),
            Arguments.of(0, false),
            Arguments.of(1, false),
            Arguments.of(2, true),
            Arguments.of(3, true),
            Arguments.of(4, false),
            Arguments.of(5, true),
        )
    }
}
