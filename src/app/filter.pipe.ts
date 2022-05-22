import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, s_key: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    return items.filter((item) => {
      return Object.keys(item).some((key) => {
        return String(item[s_key])
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
    });
    // return items.filter((item) => {
    //   return Object.keys(item).some((key1) => {
    //     return String(item[key1])
    //       .toLowerCase()
    //       .includes(searchText.toLowerCase());
    //   });
    // });
  }
}
