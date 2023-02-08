from PIL import Image
from io import BytesIO
import cv2


def main():

    windowName = ['Binary', 'Binary Inv', 'Zero', 'Zero Inv', 'Trunc']

    cap = cv2.VideoCapture(0)

    if cap.isOpened():
        ret, frame = cap.read()
    else:
        ret = False

    while ret:

        ret, frame = cap.read()

        th = 127
        max_val = 255

        ret, o1 = cv2.threshold(frame, th, max_val, cv2.THRESH_BINARY)

        cv2.imshow(windowName[0], frame)

        if cv2.waitKey(1) == 27:
            break

    cv2.destroyAllWindows()
    cap.release()


if __name__ == "__main__":
    main()