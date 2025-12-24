#ifndef READHTML_H
#define READHTML_H

//reads html file and returns
/*
class:className1
class:className2
id:idName1
id:idName2
...
*/
char** getHTMLClassesAndIds(const char* filePath, int* count);

// just frees the results from getHTMLClassesAndIds
void freeHTMLResults(char** results, int count);

#endif // READHTML_H
