import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }

  public async takePicture() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 80, // highest quality (0 to 100)
      allowEditing: false,
    });

    // Save the picture and add it to photo collection
    const savedImageFile = await this.savePicture(capturedPhoto);
    return savedImageFile;
  }

  // DOCS: https://ionicframework.com/docs/angular/your-first-app/saving-photos
  // DOCS: https://firebase.google.com/docs/storage/web/upload-files
  private async savePicture(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    const storageRef = ref(getStorage(), fileName);
    let downloadURL = '';
    // 'file' comes from the Blob or File API
    const snapshot = await uploadString(storageRef, base64Data, 'data_url');

    downloadURL = await getDownloadURL(ref(getStorage(), fileName));

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath,
      url: downloadURL
    };
  }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

}
