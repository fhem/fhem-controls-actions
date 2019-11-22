#!/bin/sh -l

rm -f $1 
while IFS= read -r -d '' FILE
do
   TIME=$(git log --pretty=format:%cd -n 1 --date=format:%Y-%m-%d\_%H:%M:%S -- "$FILE")
   FILESIZE=$(stat -c%s "$FILE")
   FILE=$(echo "$FILE"  | cut -c 3-)
   printf "UPD %s %-7d %s\n" "$TIME" "$FILESIZE" "$FILE"  >> $1
done <   <(find ./FHEM -maxdepth 2 \( -name "*.pm" \) -print0 | sort -z -g)
