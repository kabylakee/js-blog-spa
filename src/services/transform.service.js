export class TransformService {
  static fbObjectToArray(fbData) {
    return [...Object.values(fbData)];
  }
}
