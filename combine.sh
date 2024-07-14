input_directory="./input"
output_directory="$PWD"
output_file="$output_directory/output_by_sh_file.txt"

# Check if the input directory is empty
if [ -z "$(ls -A "$input_directory")" ]; then
    echo "Error: No files found in the input directory."
    [ -f "$output_file" ] && rm "$output_file"
    exit 1
fi

# Remove the output file if it exists
[ -f "$output_file" ] && rm "$output_file"

first_file=true

process_files_in_directory() {
    local directory=$1

    find "$directory" -type f | while read -r file_path; do
        relative_path=$(realpath --relative-to="$input_directory" "$file_path")

        # Add heading with file name
        if $first_file; then
            echo -e "combined by .sh file :)\n\n\n----- ----- $relative_path ----- -----" >> "$output_file"
            first_file=false
        else
            echo -e "\n\n----- ----- $relative_path ----- -----" >> "$output_file"
        fi

        # Concatenate the content of the file
        cat "$file_path" >> "$output_file"
    done
}

process_files_in_directory "$input_directory"

echo "Combined files saved to $output_file"
