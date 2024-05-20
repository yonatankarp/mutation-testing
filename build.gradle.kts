plugins {
    kotlin("jvm") version "1.9.24"
    id("info.solidsoft.pitest") version "1.15.0"
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

    testImplementation("org.junit.jupiter:junit-jupiter-api:5.10.2")
    testImplementation("org.junit.jupiter:junit-jupiter-params:5.10.2")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:5.10.2")
}

tasks.test {
    useJUnitPlatform()
}

pitest {
    targetClasses = listOf("com.yonatankarp.*")
    threads = 2 * Runtime.getRuntime().availableProcessors()
    junit5PluginVersion = "1.2.1"
    outputFormats = listOf("XML", "HTML")
    timestampedReports = false
}
