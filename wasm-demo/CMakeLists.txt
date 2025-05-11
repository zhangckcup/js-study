cmake_minimum_required(VERSION 3.12)

project(wasm-demo)

set(CMAKE_C_COMPILER "emcc")
set(CMAKE_CXX_COMPILER "em++")
set(CMAKE_C_FLAGS "-O3 -s WASM=1 -s STANDALONE_WASM -s EXPORTED_FUNCTIONS='[_add]' -s ERROR_ON_UNDEFINED_SYMBOLS=0")

add_executable(demo demo.c)

set_target_properties(demo PROPERTIES
    SUFFIX ".wasm"
    LINK_FLAGS "${CMAKE_C_FLAGS}"
)