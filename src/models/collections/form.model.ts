import { FormControl } from '@angular/forms';

export interface CollectionForm {
  printingName: FormControl<string | null>;
  collectionName: FormControl<string | null>;
  group: FormControl<string | null>;
  imagePath: FormControl<string | null>;
  imageFile: FormControl<File | null>;
}
