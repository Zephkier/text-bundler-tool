import os

input_directory = "./input"
output_directory = os.getcwd()
output_file = os.path.join(output_directory, "output by .py file.txt")

# Check if there are any files in input_directory
if not any(os.scandir(input_directory)):
    print("Error: No files found in the input directory.")
    if os.path.exists(output_file):
        os.remove(output_file)
    exit(1)

# Remove existing output file
if os.path.exists(output_file):
    os.remove(output_file)

# Flag to track whether it's the first file
first_file = True


# Function to process files in a directory
def process_files_in_directory(directory):
    global first_file

    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            relative_path = os.path.relpath(file_path, input_directory)

            # Add heading with file name
            if first_file:
                with open(output_file, "a") as output:
                    output.write(f"combined by .py file :)\n\n\n----- ----- {relative_path} ----- -----\n")
                first_file = False
            else:
                with open(output_file, "a") as output:
                    output.write(f"\n\n----- ----- {relative_path} ----- -----\n")

            # Concatenate the content of the file
            with open(file_path, "r") as input_file:
                content = input_file.read()
                with open(output_file, "a") as output:
                    output.write(content)


# Process the input directory
process_files_in_directory(input_directory)

print("Combined files saved to", output_file)
