#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int main() {
    printf("Hello from WASM!\n");
    int result = add(1, 2);
    printf("1 + 2 = %d\n", result);
    return 0;
}