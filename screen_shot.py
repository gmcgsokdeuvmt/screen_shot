import cv2
import numpy as np
from PIL import ImageGrab
from datetime import datetime
import base64

def capture_img(bbox=None):
    img = ImageGrab.grab(bbox=bbox)
    img = np.asarray(img)
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
    return img

def save_tmp_img(img):
    cv2.imwrite(datetime.now().strftime("%Y%m%d%H%M%S") + '.jpg', img)

def encode_img_to_fileobj(img, quality=100):
    encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), quality]
    result, encimg = cv2.imencode('.jpg', img, encode_param)
    if not result:
        print('could not encode image!')
        return None
    else:
        return encimg

def encode_fileobj_to_base64(fileobj):
    encoded_b64 = base64.b64encode(fileobj)
    return encoded_b64

def base64_to_datauri(encoded_b64, mime='image/jpg'):
    ascii_b64 = encoded_b64.decode('ascii')
    return 'data:{};base64,{}'.format(mime, ascii_b64)

if __name__ == '__main__':
    #img = capture_img()
    #save_tmp_img(img)

    img = capture_img()
    obj = encode_img_to_fileobj(img)
    encoded_obj = encode_fileobj_to_base64(obj)
    with open('tmp_base64.dat','wb') as f:
        f.write(encoded_obj)