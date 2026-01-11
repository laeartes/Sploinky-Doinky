#ifndef READJSCONST_H
#define READJSCONST_H

// Reads JS file and returns constant names
char** getJSConstNames(const char* filePath, int* count);

// Frees allocated memory for results
void freeJSConstResults(char **results, int count);

// Checks for empty lines
int isEmptyLine(const char* line);

#endif