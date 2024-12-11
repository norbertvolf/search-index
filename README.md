# search-index

Playing with search index

## Build

```bash
git clone https://github.com/norbertvolf/search-index.git
cd search-index
npm install
```

## Run

Run with attached file

```bash
./random_line --file input_file.txt --index 5432
./random_line input_file.txt 5432
```

## Download dictionary data

I have prepared a piece of code which downloads a dictionary file from the internet.
The file is a text file with one word per line. The file is downloaded to the current directory.

```bash
 ./random_line --download-dict --file dictionary.txt
```

## Known bugs

- The program does not handle well the case when the file is contains non-ascii characters.

```bash
 ./random_line dictionary.txt 52555
```

## Index position

Index is saved to `.local` directory in the project root.
Index file is "array" of int32 values which contains the byte offset of the beginning of each line in the input file.

## Possible improvements

- Fix bug
- Write unit tests
- Add API comments to the code
- Somehow compress the index file
- Increase performance of index creating by multithreading (workers) for computing positions
- Increase offset size to 64 bit integer
