# fhem-controls-actions JavaScript action

This action creates FHEM controls file via github actions which is compatible with `update all <url>` and `update add <url>` command.
More details about this command at the [Fhem Wiki](https://wiki.fhem.de/wiki/Update#update_all).

## Inputs

### `filename`

**Required** The name of controls file. Should be named `controls_<project/module>.txt`

### `dirname`

**Optional** The name of the directory where the files are located which should be updated `FHEM`

### `extension`

**Optional** The file extension which should be included in the controls file. Normally `.pm` for Perl Modules.

## Outputs
none

## Example usage
1. Checkout the repository

```
    steps: 
    - name: Checkout Repostory
      uses: actions/checkout@v1
```

2. You can create the controls file
```
    - name: update controls files
      uses: fhem/fhem-controls-actions@master
      with:
        filename: controls_rsl.txt 
```
...
Push back the changes via https://github.com/marketplace/actions/github-push
