from ..classes.File import File
from ..classes.Utility import Utility         
import spacy

nlp = spacy.load('en_core_web_md')

class ChatService():

    @staticmethod
    def provide_response(query):
        response_data = dict()
        preprocess = Utility.pre_process_task(query) 
        keyword_list = Utility.filter_pos_words(preprocess)
        if not keyword_list:
            return {
                'status': 'success',
                'message': 'Thanks for Submission',
                'data': "Please Enter a Valid Query"
            }
        else:
            file_reader = File("./data/model.json")
            data  = file_reader.read_file()
            keywords_with_indices = {entry['keyword']:index for index, entry in enumerate(data)}
            for keyword in keyword_list:
                word, similar = ChatService.check_similarity(keyword,keywords_with_indices)
                if word in response_data:
                    if similar > response_data[word]:
                        response_data[word] = similar
                else:
                    response_data[word] = similar
            max_word,max_similarity = max(response_data.items(), key=lambda item: item[1])
            final_data = data[keywords_with_indices[max_word]]
            response_output = f"It falls under the classification of {final_data['category_1']} discrimination and pertains to {final_data['category_2']}."
            return {
                'status': 'success',
                'message': 'Thanks for Submission',
                'data': response_output
            } 
    
    @classmethod
    def check_similarity(cls, keyword, keywords_with_indices):
        similarities = {}
        keyword_doc = nlp(keyword)
        for word in keywords_with_indices.keys():
            word_doc = nlp(word)
            if keyword_doc.has_vector and word_doc.has_vector:
                similarity = keyword_doc.similarity(word_doc)
            else:
                similarity = 0.0 
            similarities[word] = similarity
        max_word, max_similarity = max(similarities.items(), key=lambda item: item[1])
        return max_word, max_similarity

