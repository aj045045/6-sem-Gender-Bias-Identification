from ..classes.File import File
from ..classes.Utility import Utility         

class AdminService:
    
    @staticmethod 
    def add_selected_keyword(keywords):
        for item in keywords:
            file = File("./data/model.json")
            file.read_file()
            file._keyword = item['keyword']
            file._category_1 = item['category_1']
            file._category_2 = item['category_2']
            file.write_file()
        return {
                'status': 'success',
                'data': "Keyword Added"
            }
        
    @staticmethod
    def filter_list(query):
        preprocess = Utility.pre_process_task(query) 
        keyword_list = Utility.filter_pos_words(preprocess)
        if not keyword_list:
            raise Exception("Please Enter Valid Query")
        else:
            file_reader = File("./data/model.json")
            data  = file_reader.read_file()
            keywords_with_indices = {entry['keyword']:index for index, entry in enumerate(data)}
            if not keywords_with_indices:
                raise Exception("Database is Empty please Visit us again")
        response_data = AdminService.remove_matching_keywords(keywords_with_indices,keyword_list)
        return  {
                'status': 'success',
                'data': response_data
            }
        
    @classmethod
    def remove_matching_keywords(cls,keywords_with_indices, keyword_list):
        for keyword in keywords_with_indices:
            if keyword in keyword_list:
                keyword_list.remove(keyword)
        return keyword_list

