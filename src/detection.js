import { array, ones, uint8 } from 'numpy';
import os from 'os';
import time from 'time-require';
import cv from './opencv'


const img_size = 60; // has to be the same as for training
const h = 19;
const s = 91;
const v = 4;
const h1 = 64;
const s1 = 255;
const v1 = 255;
const pad = 60;

const cap = new VideoCapture(0);

function largest_contour(contours) {
  return Math.max(contours, (c) => contourArea(c))[1];
}

function contour_center(c) {
  const M = moments(c);
  const center = [
    Math.round(M['m10'] / M['m00']),
    Math.round(M['m01'] / M['m00']),
  ];
  return center;
}

function only_color(img, h, s, v, h1, s1, v1) {
  const hsv = cvtColor(img, COLOR_BGR2HSV);
  const lower = array([h, s, v]);
  const upper = array([h1, s1, v1]);
  const mask = inRange(hsv, lower, upper);
  const res = bitwise_and(img, img, mask=mask);
  const kernel = ones((3, 3), uint8);
  const morph = morphologyEx(mask, MORPH_OPEN, kernel);
  return res, morph;
}

function bbox(img, c) {
  const x = c.x;
  const y = c.y;
  const w = c.width;
  const h = c.height;
  const roi = img.slice(y - pad, y + h + pad, x - pad, w + x + pad);
  const center = [x, y];
  return roi, center;
}

const dimData = img_size * img_size;

while (true) {
    // Read the image from the camera
    const img = cv.imread('');
  
    // Create a copy of the image to draw on
    const imgc = img.clone();
  
    // Get the height and width of the image
    const height = img.rows;
    const width = img.cols;
  
    // Get the mask of the green regions in the image
    const mask = cv.only_color(img, h, s, v, h1, s1, v1);
  
    // Find the contours in the image
    const contours = cv.findContours(mask, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);
  
    // Iterate through the contours
    for (const c of contours) {
      // If the contour is too big or too small, it can be ignored
      const area = cv.contourArea(c);
  
      // If the area is within the desired range, crop out the green shape
      if (area > 2000 && area < 1180000) {
        const roi = cv.bbox(img, c);
  
        // If the roi is not too long and stringy, get the black and white image of the shape
        if (np.prod(roi.shape[:2]) > 10) {
          const roi = cv.resize(roi, (img_size, img_size));
          const mask = cv.only_color(roi, h, s, v, h1, s1, v1);
          const roi = 255 - roi; // Keras likes things black on white
          const mask = cv.resize(mask, (img_size, img_size));
          const mask = mask.reshape(dimData);
          const mask = mask.astype('float32');
          const mask /= 255;
  
          // Get the center of the contour
          const center = cv.contour_center(c);
  
          // approximate the contour
          const approx = cv.approxPolyDP(c, 0.03 * cv.arcLength(c, true), true);
  
          // Draw the contour
          cv.drawContours(imgc, c, -1, (0, 0, 255), 1);
  
          // Draw a circle around the center of the contour
          cv.circle(imgc, center, 10, (0, 0, 255), -1);
  
          // Send data to Arduino
          const hei = center[1];
          const wid = center[0];
          const positioning = `${wid},${hei}\n`;
          ser.write(positioning);
        }
      }
    }
  
    // Display the image
    cv.imshow('img', cv.resize(imgc, (640, 480)));
  
    // If the user presses `q`, break out of the loop
    if (cv.waitKey(1) == ord('q')) {
      break;
    }
  }
  
  // Close the camera and destroy all windows
  cap.release();
  cv.destroyAllWindows();