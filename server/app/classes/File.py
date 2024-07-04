import json
import os

class File():

    def __init__(self, file) -> None:
        self.__file_path = file
        self.__keyword = ""
        self.__category_1 = ""
        self.__category_2 = ""
        self.__existing_data = ""
        
    @property
    def _keyword(self):
        return self.__keyword

    @_keyword.setter
    def _keyword(self, value):
        self.__keyword = value

    @property
    def _category_1(self):
        return self.__category_1

    @_category_1.setter
    def _category_1(self, value):
        self.__category_1 = value

    @property
    def _category_2(self):
        return self.__category_2

    @_category_2.setter
    def _category_2(self, value):
        self.__category_2 = value


    @classmethod
    def __set_data(cls,keyword,category_1,category_2):
        return {
            "keyword": keyword,
            "category_1": category_1,
            "category_2": category_2
        }

    def print_value(self) -> str:
        return self.__set_data(self._keyword,self._category_1,self._category_2)

    def read_file(self):
        if not os.path.exists(self.__file_path):
            raise FileNotFoundError(f"The file {self.__file_path} does not exist.")
        try:
            with open(self.__file_path, 'r') as json_file:
                self.__existing_data = json.load(json_file)
                json_file.close()
            return self.__existing_data
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON in file {self.__file_path}: {e}")
            self.__existing_data = []
            return self.__existing_data
            
    def write_file(self):
        new_entry = self.__set_data(self._keyword, self._category_1, self._category_2)
        if isinstance(self.__existing_data, list):
            if any(entry['keyword'] == self._keyword for entry in self.__existing_data):
                print(f"Keyword '{self._keyword}' already exists. Skipping write.")
            else:
                self.__existing_data.append(new_entry)
        with open(self.__file_path, 'w') as json_file:
            json.dump(self.__existing_data, json_file, indent=4)
            json_file.close()