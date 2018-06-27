## EML to PNG

### How to use
```
git clone https://github.com/lbeeon/eml2png.git

cd eml2png

#create emls folder & cp *.eml
mkdir emls

docker build -t eml2png .

docker run -it -v (PWD):/data eml2png /bin/bash

cd /data && npm i && npm start

```