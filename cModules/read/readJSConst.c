#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

int isEmptyLine(const char* line) {
    while (*line)
    {
        if (*line == '\n' || *line == '\r')     // newline or carriage return -> empty line
            break;
        if (!isspace((unsigned char)*line))     // not whitespace -> not an empty line
            return 0;
        line++;
    }
    return 1;
}

char** getJSConstNames(const char* filePath, int* count) {
    FILE* file = fopen(filePath, "r");
    if (!file) {
        printf("Could not open the file.\n");
        return NULL;
    }

    char** results = NULL;
    *count = 0;
    char line[1024];    
    int start = 0;   // flag for if "//placeholders" was found yet

    while (fgets(line, sizeof(line), file)) {
        if (!start) {
            char* pos = strstr(line, "//placeholders");
            if (pos) 
                start = 1;
            continue;
        }

        if (isEmptyLine(line))
            break;
        
        char* pos = strstr(line, "const");
        if (!pos) 
            continue;

        pos += 5; // skip "const"
        while (*pos && isspace((unsigned char)*pos))   // skip spaces
            pos++;

        char name[256];
        int n = 0;

        while (*pos && n < (int)sizeof(name) - 1){
            char c = *pos;
            if (isspace((unsigned char)c) || c == '=') // check whether the name ended yet
                    break;
            name[n++] = c;
            pos++;
        }

        name[n] = '\0';

        if (n == 0)
            continue;
        
        char* entry = (char*)malloc((size_t)n + 1);     // n letters + "\0"
        if (!entry)
            break;

        strcpy(entry, name);    //
        char** temp = (char**)realloc(results, sizeof(char*) * (size_t)(*count + 1));   // for expanding the results array
        if (!temp) {
            free(entry);
            break;
        }

        results = temp;
        results[*count] = entry;
        (*count)++;
    }

    return results;
}

void freeJSConstResults(char **results, int count) {
    if (!results)
        return;
    for (int i = 0; i < count; i++)
        free(results[i]);

    free(results);
}

int main() {
    int count = 0;
    char** results = getJSConstNames("../../scripts.js", &count);

    for (int i = 0; i < count; i++)
        printf("%s\n", results[i]);

    freeJSConstResults(results, count);
    return 0;
}