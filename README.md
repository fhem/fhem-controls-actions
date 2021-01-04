# fhem-controls-actions JavaScript action (Version 2 beta)

This action creates FHEM controls file via github actions which is compatible with `update all <url>` and `update add <url>` command.
More details about this command at the [Fhem Wiki](https://wiki.fhem.de/wiki/Update#update_all).

## Inputs

### `filename`

**Required** The name of controls file. Should be named `controls_<project/module>.txt`

### `directory`

**Optional** The name of the directory where the files are located which should be updated `FHEM`

### `extension`

**Optional** The file extension which should be included in the controls file. Normaly `.pm` for Perl Modules.

### `writemode`

**Optional** You can controle the writemode which is used to open the file. Default w, which will create or truncate the controls file.
If you want to append data, to an existing controls file, then you can specify the value a for writemode.

## Outputs
### `colteols_output`
Same content which is also written into the controls file


## Example usage
1. Checkout the repository

```
    steps: 
    - name: Checkout Repostory
      uses: actions/checkout@v1
      with:
        fetch-depth: 0

```

2. You can create the controls file
```
    - name: update controls files
      uses: fhem/fhem-controls-actions@v2.00b
      with:
        filename: controls_rsl.txt 
```
...
Push back the changes via https://github.com/marketplace/actions/github-push
