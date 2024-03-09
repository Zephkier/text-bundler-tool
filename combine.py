import os

input_directory = "./input"
output_directory = os.getcwd()
output_file = os.path.join(output_directory, "output by .py file.txt")

# Check if there are any files in input_directory
files = os.listdir(input_directory)
if not files:
    print("Error: No files found in the input directory.")
    os.remove(output_file)
    exit(1)

# Remove existing output file
if os.path.exists(output_file):
    os.remove(output_file)

# Flag to track whether it's the first file
first_file = True

# Loop through each file in input_directory
for file in files:
    file_path = os.path.join(input_directory, file)

    # Add heading with file name
    if first_file:
        with open(output_file, "a") as output:
            output.write(
                f"combined by .py file :)\n\n\n-------------------- {file} --------------------\n"
            )
        first_file = False
    else:
        with open(output_file, "a") as output:
            output.write(f"\n\n\n-------------------- {file} --------------------\n")

    # Concatenate the content of the file
    with open(file_path, "r") as input_file:
        content = input_file.read()
        with open(output_file, "a") as output:
            output.write(content)

print("Combined files saved to", output_file)
