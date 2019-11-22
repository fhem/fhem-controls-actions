# fhem-controls-actions docker action

This action creates FHEM controls file via github actions which is compatible with `fhem update all` and `fhem update add` command.

## Inputs

### `filename`

**Required** The name of controls file. Should be named <project/module>_controls.txt
## Outputs

### `return code`

If a control file was created or nor

## Example usage

uses: actions/fhem-controls-actions@v1
with:
  filename: 'rsl_controls.txt'
