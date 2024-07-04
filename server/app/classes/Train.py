from File import File
from Utility import Utility

access = {
    1: "id",
    2: "tweet",
    3: "labels_task1",
    4: "labels_task2",
    5: "labels_task3",
}

def create_output(tweet,label_2,label_3,check_word):
    file_writer = File("../data/model.json")
    file_writer.read_file()
    print(f"\n======================================================\n Choose Tweet:\n======================================================")
    print(f"\nTweet: {tweet}")
    file_writer._category_1 = ''.join(Utility.most_common_element_label_2(label_2))
    file_writer._category_2 = ''.join(Utility.most_common_element_label_3(label_3))
    keyword = Utility.choose_word(check_word)
    if len(keyword) > 1:
        for key in keyword:
            file_writer._keyword = key
            file_writer.write_file()
    else:
        file_writer._keyword = ''.join(keyword)
        file_writer.write_file()
    
def main():
    read_file = File("../data/sample.json")
    for key in read_file.read_file():
        print(key[access[1]])
        tweet = key[access[2]]
        label_1 = eval(key[access[3]])
        label_2 = eval(key[access[4]])
        label_3 = eval(key[access[5]])
        if label_1.count('YES') >= 3:
            pre_process = Utility.pre_process_task(tweet)
            filter_word = Utility.filter_pos_words(pre_process)
            if len(filter_word) > 0:
                create_output(tweet,label_2,label_3,filter_word)        
            else:
                print("Error occur")
            
if __name__ == "__main__":
    main()
