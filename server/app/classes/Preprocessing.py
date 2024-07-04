from nltk import pos_tag, word_tokenize
import nltk
from autocorrect import Speller
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.tag import pos_tag
import string
import re
import unidecode
import contractions

# Download NLTK resource if not already downloaded
nltk.download('punkt', quiet=True)
nltk.download('wordnet', quiet=True)
nltk.download('averaged_perceptron_tagger', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('vader_lexicon', quiet=True)
nltk.download('words', quiet=True)


class Preprocessing():

    # REVIEW - Init Method
    def __init__(self, text):
        self.__text = text

        # REVIEW - Remove HTML Tags
    def remove_html_tags(self) -> str:
        html_tags_pattern = re.compile(r'<.*?>')
        clean_text = re.sub(html_tags_pattern, '', self.__text)
        self.__text = clean_text.lower()
        return self.__text

        # REVIEW - Strip Accents
    def remove_accents(self):
        self.__text = unidecode.unidecode(self.__text)
        return self.__text

    # REVIEW - Check text and edit text and also remove contraction in a text
    def checking_text(self) -> str:
        spell = Speller(lang='en')
        text = contractions.fix(self.__text)
        self.__text = ' '.join([spell(word) for word in text.split()])
        return self.__text

        # REVIEW - Convert Hastags
    def convert_hashtags_upper(self):
        self.__text = re.sub(r"#([A-Za-z0-9_]+)", r"\1",  self.__text)
        return self.__text

        # REVIEW - Remove URL and emojis
    def remove_url(self):
        self.__text = re.sub(
            r"http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+", "",  self.__text)
        return self.__text

        # REVIEW - Remove Extra Words
    def removing_words(self) -> str:
        words = word_tokenize(self.__text)
        tagged_words = pos_tag(words)
        unique_words = []
        for word, pos in tagged_words:
            if pos not in ['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ', 'MD', 'DT', 'IN', 'CC', 'TO', 'PRP']:
                if word not in unique_words:
                    unique_words.append(word)
        tokens = [word for word in unique_words if word not in string.punctuation]
        english_stopwords = set(stopwords.words('english'))
        tokens = [word for word in tokens if word.lower()
                  not in english_stopwords]
        cleaned_tokens = [word for word in tokens if word.isalpha()]
        self.__text = ' '.join(cleaned_tokens)
        return self.__text

        # REVIEW - Lemmatize words
    def lemmatize_text(self):
        lemmatizer = WordNetLemmatizer()
        words = word_tokenize(self.__text)
        lemmatized_words = [lemmatizer.lemmatize(word) for word in words]
        self.__text = ' '.join(lemmatized_words)
        return self.__text
    
    
