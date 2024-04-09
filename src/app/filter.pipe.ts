import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, ...args: any): any 
  {
    if (!value) return null;
    if (!args || !args.length || !args[0]) return value; // Check if args is empty or null

    const searchTerm = args[0].toLowerCase(); // Get the search term from args
    return value.filter(function(item: any) {
      return JSON.stringify(item).toLowerCase().includes(searchTerm);
    });
  }
  }


