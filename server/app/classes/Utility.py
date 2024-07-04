from collections import Counter
from nltk import pos_tag, word_tokenize
from .Preprocessing import Preprocessing
import nltk
import enchant

nltk.download('punkt',quiet=True)
nltk.download('averaged_perceptron_tagger',quiet=True)
nltk.download('words', quiet=True)

class Utility:
    
    @staticmethod
    def filter_pos_words(sentence: str):
        tags = ['NN', 'VB', 'VBZ', 'VBD', 'VBG', 'VBN', 'VBP']
        words = word_tokenize(sentence)
        tagged_words = pos_tag(words)
        d = enchant.Dict("en_US")
        filtered_words = [word for word, pos in tagged_words if pos in tags and d.check(word)]
        return filtered_words
    
    @staticmethod
    def pre_process_task(text):
        text_method = Preprocessing(text)
        response = text_method.remove_html_tags()
        response = text_method.remove_accents()
        response = text_method.convert_hashtags_upper()
        response = text_method.remove_url()
        response = text_method.checking_text()
        response = text_method.removing_words()
        response = text_method.lemmatize_text()
        return response
    
    @staticmethod
    def most_common_element_label_2(lst):
        lst = [element for element in lst if element != '-']
        counts = Counter(lst)
        max_occurrences = max(counts.values())
        most_common_elements = [element for element,
                                count in counts.items() if count == max_occurrences]
        return most_common_elements

    @staticmethod
    def most_common_element_label_3(nested_list):
        while True:
            try:
                flattened_list = [item for sublist in nested_list for item in sublist]
                list_value = Utility.most_common_element_label_2(flattened_list)
                if len(list_value) > 1:
                    print(f"\nCATEGORY OPTION :")
                    for index, item in enumerate(list_value):
                        print(f"\t{index}: {item}")
                        tweet_input = int(input("Enter value (0,1,...) :"))
                        return list_value[tweet_input]
                else:
                    print("\nCATEGORY :",list_value)
                    return list_value
            except ValueError and Exception:
                print("Invalid Input. Please enter an integer")
        
    @staticmethod
    def choose_word(task):
        while True:
            try:
                print(f"\nKEYWORD OPTION :")
                for index, item in enumerate(task):
                    print(f"\t{index}: {item}")
                task_input = str(input("Enter value (',' separated) :"))
                split_string = task_input.replace(" ", "").split(",")
                filtered_split_string = [num for num in split_string if num]
                result_list = [int(num) for num in filtered_split_string]
                selected_keywords = []
                for idx in result_list:
                    if 0 <= idx < len(task):
                            selected_keywords.append(task[idx])
                if len(selected_keywords) == 0:
                    raise Exception()
                return selected_keywords
            except:
                print("Enter the correct value from index")
            
    # @staticmethod
    # def check_eng_word(result):
    #     english_words = set(words.words())
    #     work = [word for word in result if word.lower() in english_words]
    #     return work