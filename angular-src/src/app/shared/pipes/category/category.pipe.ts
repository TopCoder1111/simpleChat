import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: any, args?: any[]): string {
    if (Array.isArray(args)) {
      const category = args.find(cat => cat.id === value);
      if (category) {
        return category.title;
      }
    }
    return value;
  }

}
