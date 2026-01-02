#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char** getHTMLClassesAndIds(const char* filePath, int* count)
{
    FILE* file = fopen(filePath, "r");
    if (!file)
    {
        perror("Could not open the file");
        return NULL;
    }

    char** results = NULL;
    *count = 0;
    char line[1024];

    while (fgets(line, sizeof(line), file))
    {
        const char* keys[] = { "class=\"", "id=\"" };

        for (int k = 0; k < 2; k++)
        {
            const char* key = keys[k];
            char* pos = strstr(line, key);

            while (pos)
            {
                pos += strlen(key);
                char* endQuote = strchr(pos, '"');
                if (!endQuote)
                {
                    break;
                }

                size_t valueLen = endQuote - pos;
                size_t keyLen = strlen(keys[k]) - 2;

                char* entry = malloc(keyLen + 1 + valueLen + 1);
                if (!entry)
                {
                    break;
                }

                strncpy(entry, key, keyLen);
                entry[keyLen] = ':';
                strncpy(entry + keyLen + 1, pos, valueLen);
                entry[keyLen + 1 + valueLen] = '\0';

                results = realloc(results, sizeof(char*) * (*count + 1));
                results[*count] = entry;
                (*count)++;

                pos = strstr(endQuote, key);
            }
        }
    }

    fclose(file);
    return results;
}

void freeHTMLResults(char** results, int count)
{
    for (int i = 0; i < count; i++)
    {
        free(results[i]);
    }
    free(results);
}

int main()
{
    int count = 0;
    char** results = getHTMLClassesAndIds("../../index.html", &count);

    for (int i = 0; i < count; i++)
    {
        printf("%s\n", results[i]);
    }

    freeHTMLResults(results, count);
    return 0;
}
