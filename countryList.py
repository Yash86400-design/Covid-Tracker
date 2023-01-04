import requests
import json

res = requests.get("https://api.covid19api.com/countries")

response = json.loads(res.text)

# print(response[2]["Country"])

object_of_countries = {}

for i in range(0, len(response)):
    # print(response[i]["Country"], response[i]["Slug"])
    object_of_countries[response[i]["Country"]] = response[i]["Slug"]

object_of_countries = sorted(object_of_countries.items())
print(object_of_countries)

# countryFile = open("country.js", "w")
# countryFile.write("const countriesObject = { \n")
# countryFile.close()
# countryFile = open("country.js", "a")


for i in object_of_countries:
  print(i[1])
  # countryFile.write(i[0] : i[1])
