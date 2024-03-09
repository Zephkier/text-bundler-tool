input_directory="./input"
output_directory="$PWD"
output_file="$output_directory/output by .sh file.txt"

# Check if there are any files in input_directory
if [ -z "$(find "$input_directory" -maxdepth 1 -type f -print -quit)" ]; then
    echo "Error: No files found in the input directory."
    rm -f "$output_file"
    exit 1
fi

# Remove existing output file
rm -f "$output_file"

# Flag to track whether it's the first file
first_file=true

# Loop through each file in input_directory
for file in "$input_directory"/*; do
    # Get file name without path
    filename=$(basename "$file")
    
    # Add heading with file name
    if [ "$first_file" = true ]; then
      echo -e "combined by .sh file :)\n\n\n-------------------- $filename --------------------" >> "$output_file"
      first_file=false
    else
      echo -e "\n\n\n-------------------- $filename --------------------" >> "$output_file"
    fi
    
    # Concatenate the content of the file
    cat "$file" >> "$output_file"
done

echo "Combined files saved to $output_file"
