# Makefile for compiling WASM module

# Compiler settings
CC = emcc
CFLAGS = -O3 -s WASM=1 -s STANDALONE_WASM -s EXPORTED_FUNCTIONS="['_add']" -s ERROR_ON_UNDEFINED_SYMBOLS=0

# Source files
SRC = demo.c
OUTPUT = demo.wasm

# Default target
all: $(OUTPUT)

# Compile rule
$(OUTPUT): $(SRC)
	$(CC) $(CFLAGS) $< -o $@

# Clean rule
clean:
	rm -f $(OUTPUT)

.PHONY: all clean