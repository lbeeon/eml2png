### EML to PNG

#### How to use
'''
git clone 

cd eml2png

#create emls folder & cp emls
mkdir emls

docker build -t eml2png .

docker run -it -v (PWD):/data eml2png /bin/bash

cd /data && npm i && npm start
'''

