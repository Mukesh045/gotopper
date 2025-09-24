class PyramidPattern {
    public static void main(String[] args) {
        int rows = 5; // Number of rows for the pyramid

        // Outer loop for each row
        for (int i = 1; i <= rows; i++) {
            // Inner loop for printing leading spaces
            // This centers the stars by printing (rows - i) spaces
            for (int j = 1; j <= rows - i; j++) {
                System.out.print(" ");
            }

            // Inner loop for printing stars
            // The number of stars in each row is (2 * i - 1)
            for (int k = 1; k <= (2 * i - 1); k++) {
                System.out.print("*");
            }

            // Move to the next line after printing stars for the current row
            System.out.println();
        }
    }
}