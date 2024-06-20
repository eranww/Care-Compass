import wx
import sqlite3

testMode = True

# Utility functions

def getLogo(panel):
    return wx.StaticBitmap(panel, -1, wx.Bitmap("logo.png", wx.BITMAP_TYPE_ANY))

def getTitleFont():
    return wx.Font(10, family=wx.DECORATIVE, weight=wx.BOLD, style=wx.NORMAL)

# class ArtictionaryDatabase():
#     # fileName = "artictionary_db.sqlite"
#     # testFileName = "test_db.sqlite"

#     def __init__(self) -> None:
#         pass
        # self.connection = None
        # dbFile = self.testFileName if testMode else self.fileName
        # try:
        #     self.connection = sqlite3.connect(dbFile)
        #     print("Connection to SQLite DB successful")
        # except sqlite3.Error as e:
        #     print(f"Failed to connect to SQLite, the error '{e}' occurred")
        
        # wordsTable = """
        # CREATE TABLE IF NOT EXISTS words (
        # id INTEGER PRIMARY KEY AUTOINCREMENT,
        # word TEXT NOT NULL,
        # translation TEXT NOT NULL,
        # sentence TEXT,
        # categories TEXT
        # );
        # """
        # self.executeQuery(wordsTable)

        # categoriesTable = """
        # CREATE TABLE IF NOT EXISTS categories (
        # id INTEGER PRIMARY KEY AUTOINCREMENT,
        # category TEXT NOT NULL,
        # UNIQUE(category)
        # );
        # """
        # self.executeQuery(categoriesTable)
        # self.insertCategory("General")

    # def executeQuery(self, query):
    #     cursor = self.connection.cursor()
    #     try:
    #         cursor.execute(query)
    #         self.connection.commit()
    #         print("Query executed successfully")
    #     except sqlite3.Error as e:
    #         print(f"Failed to execute query, the error '{e}' occurred")
    
    # def executeReadQuery(self, query):
    #     cursor = self.connection.cursor()
    #     result = None
    #     try:
    #         cursor.execute(query)
    #         result = cursor.fetchall()
    #         return result
    #     except sqlite3.Error as e:
    #         print(f"Failed to execute read query, the error '{e}' occurred")

    # def clearDatabase(self):
    #     query = f"""
    #     DELETE FROM words;
    #     """
    #     self.executeQuery(query)

    # ######### Words Table #########
    
    # def insertWord(self, word, translation, sentence, categories):
    #     print(f"Inserting word to DB: {word}, {translation}, {sentence}, {categories}")
    #     # TODO: check if exists, check input validity

    #     if categories:
    #         # Validate that all of the categories exist in the DB
    #         # Assumption: categories is a string with categories seperated only by a comma, no spaces
    #         categoriesList = categories.split(',')
    #         for category in categoriesList:
    #             if category != "" and not self.isCategoryExists(category):
    #                 print("Category does not exist!")
    #                 # TODO: pop error window
    #                 return
        
    #     query = f"""
    #     INSERT INTO
    #     words (word, translation, sentence, categories)
    #     VALUES
    #     ('{word.lower()}', '{translation}', '{sentence}', '{categories}');
    #     """
    #     self.executeQuery(query)
    #     print("Word added!")

    # def deleteWord(self, id):
    #     query = f"""
    #     DELETE FROM words WHERE id = {id};
    #     """
    #     self.executeQuery(query)
    #     print(f"Word {id} deleted!")

    # def findWord(self, word):
    #     query = f"""
    #     SELECT * FROM words WHERE word = '{word.lower()}';
    #     """
    #     return self.executeReadQuery(query)
    
    # def getAllWords(self):
    #     query = "SELECT * FROM words"
    #     return self.executeReadQuery(query)
    
    # def getAllWordsOfCategory(self, category):
    #     if self.isCategoryExists(category) == False:
    #         print("Category does not exist!")
    #         # TODO: pop error window
    #         return
    #     wordsTable = self.getAllWords()
    #     for word in wordsTable:
    #         if category not in word[4]:
    #             wordsTable.remove(word)
    #     return wordsTable
    
    # # ######### Categories Table #########

    # def insertCategory(self, category):
    #     query = f"""
    #     INSERT OR IGNORE INTO
    #     categories (category)
    #     VALUES
    #     ('{category}');
    #     """
    #     self.executeQuery(query)

    # def deleteCategory(self, category):
    #     query = f"""
    #     DELETE FROM categories WHERE category = {category};
    #     """
    #     self.executeQuery(query)

    # def isCategoryExists(self, category):
    #     query = f"""
    #     SELECT * FROM categories WHERE category = '{category}';
    #     """
    #     if not self.executeReadQuery(query):
    #         return False
    #     return True
    
    # def getAllCategories(self):
    #     query = "SELECT * FROM categories"
    #     return self.executeReadQuery(query)


class SearchPanel(wx.Panel):
    categoriesCheckBoxes = []

    def __init__(self, parent):
        super().__init__(parent)
        self.selectedWordId = None
        
        # Logo
        self.sizer = wx.BoxSizer(wx.VERTICAL)
        self.sizer.Add(getLogo(self), 0, wx.ALL | wx.CENTER, 5)

        # Search box
        textBoxSizer = wx.BoxSizer(wx.HORIZONTAL)
        self.sizer.Add(textBoxSizer, 0, wx.ALL | wx.CENTER, 5)
        self.textBox = wx.TextCtrl(self, size=(200, -1), style=wx.TE_PROCESS_ENTER)
        textBoxSizer.Add(self.textBox, 0, wx.ALL, 5)
        searchButton = wx.Button(self, label='Search')
        searchButton.SetBackgroundColour(wx.BLACK) 
        textBoxSizer.Add(searchButton, 0, wx.ALL | wx.CENTER, 5)
        searchButton.Bind(wx.EVT_BUTTON, self.searchWordOnPress) # pressing 'search' button
        self.Bind(wx.EVT_TEXT_ENTER, self.searchWordOnPress)     # pressing 'enter' key

        # Filter category
        # self.filterCategorySizer = wx.BoxSizer(wx.HORIZONTAL)
        # self.sizer.Add(self.filterCategorySizer, 0, wx.ALL | wx.CENTER, 5)
        # self.updateFilterCategories()

        # Show/Hide
        # showHideSizer = wx.BoxSizer(wx.HORIZONTAL)
        # self.sizer.Add(showHideSizer, 0, wx.ALL | wx.CENTER, 5)
        # showAllWordsButton = wx.Button(self, label='Show all')
        # showHideSizer.Add(showAllWordsButton, 0, wx.ALL | wx.CENTER, 5)
        # showAllWordsButton.Bind(wx.EVT_BUTTON, self.showAllWordsOnPress)
        # hideAllWordsButton = wx.Button(self, label='Hide all')
        # showHideSizer.Add(hideAllWordsButton, 0, wx.ALL | wx.CENTER, 5)
        # hideAllWordsButton.Bind(wx.EVT_BUTTON, self.hideAllWordsOnPress)

        # Results table
        self.resultSizer = wx.BoxSizer(wx.VERTICAL)
        self.wordsTable = wx.ListCtrl(
            self, size=(-1, 100), 
            style=wx.LC_REPORT | wx.BORDER_SUNKEN
        )
        self.wordsTable.ClearAll()
        self.wordsTable.InsertColumn(0, 'ID', width=30)
        self.wordsTable.InsertColumn(1, 'Word', width=100)
        self.wordsTable.InsertColumn(2, 'Translation', width=100)
        self.wordsTable.InsertColumn(3, 'Sentence', width=200)
        self.wordsTable.InsertColumn(4, 'Category', width=150)
        self.resultSizer.Add(self.wordsTable, 0, wx.ALL | wx.CENTER, 5)
        self.sizer.Add(self.resultSizer, 0, wx.ALL | wx.CENTER, 5)

        # Delete word
        # deleteButton = wx.Button(self, label='Delete selected word')
        # self.sizer.Add(deleteButton, 0, wx.ALL | wx.CENTER, 5)
        # deleteButton.Bind(wx.EVT_BUTTON, self.deleteSelectedWordOnPress)
        # self.wordsTable.Bind(wx.EVT_LIST_ITEM_SELECTED, self.selectWordInList, self.wordsTable)

        self.SetSizer(self.sizer)

    # def updateFilterCategories(self):
    #     self.filterCategorySizer.Clear(True)
    #     filterCategoryText = wx.StaticText(self, label="Categories")
    #     self.filterCategorySizer.Add(filterCategoryText, 0, wx.ALL, 5)

    #     categoriesList = db.getAllCategories()
    #     for category in categoriesList:
    #         self.categoriesCheckBoxes.append(wx.CheckBox(self, label=category[1]))
    #         self.filterCategorySizer.Add(self.categoriesCheckBoxes[-1], 0, wx.ALL, 5)
    #     filterCategoryShowButton = wx.Button(self, label='Show')
    #     self.filterCategorySizer.Add(filterCategoryShowButton, 0, wx.ALL | wx.CENTER, 5)
    #     filterCategoryShowButton.Bind(wx.EVT_BUTTON, self.filterCategoryShowOnPress)

    def printWordsToTable(self, wordsList):
        self.wordsTable.DeleteAllItems()
        for word in wordsList:
            index = self.wordsTable.InsertItem(self.wordsTable.GetItemCount(), str(word[0]))
            self.wordsTable.SetItem(index, 1, word[1])
            self.wordsTable.SetItem(index, 2, word[2])
            self.wordsTable.SetItem(index, 3, word[3])
            self.wordsTable.SetItem(index, 4, word[4])

    def searchWordOnPress(self, event):
        pass
        # value = self.textBox.GetValue()
        # if not value:
        #     wx.MessageBox("You need to type something.", 'Error', wx.OK | wx.ICON_ERROR)
        # else:
        #     wordsList = db.findWord(value)
        #     if not wordsList:
        #         self.textBox.Clear()
        #         wx.MessageBox(f"The word \"{value}\" not found!", 'Error', wx.OK | wx.ICON_ERROR)
        #     else:
        #         self.printWordsToTable(wordsList)
        #         # TODO: add double click on word to show word info card/edit word

    def deleteSelectedWordOnPress(self, event):
        if self.selectedWordId == None:
            print("No word selected!")
        else:
            self.wordsTable.DeleteItem(self.wordsTable.GetFocusedItem())
            # db.deleteWord(self.selectedWordId)
            self.selectedWordId = None

    def selectWordInList(self, event):
        index = event.GetIndex()
        wordItem = self.wordsTable.GetItem(index)
        self.selectedWordId = wordItem.GetText()

    def showAllWordsOnPress(self, event):
        pass
        # wordsList = db.getAllWords()
        # if not wordsList:
        #     wx.MessageBox(f"Your artictionary is empty!", 'Error', wx.OK | wx.ICON_ERROR)
        # else:
        #     self.printWordsToTable(wordsList)
    
    def hideAllWordsOnPress(self, event):
        self.wordsTable.DeleteAllItems()

    # def filterCategoryShowOnPress(self, event):
    #     selectedCategories = []
    #     for checkBox in self.categoriesCheckBoxes:
    #         if checkBox.GetValue():
    #             selectedCategories.append(checkBox.GetLabel())
    #     if not selectedCategories:
    #         wx.MessageBox(f"You need to select at least one category!", 'Error', wx.OK | wx.ICON_ERROR)
    #     else:
    #         wordsList = []
    #         for category in selectedCategories:
    #             wordsList += db.getAllWordsOfCategory(category)
    #         if not wordsList:
    #             wx.MessageBox(f"No words found in the selected categories!", 'Error', wx.OK | wx.ICON_ERROR)
    #         else:
    #             self.printWordsToTable(wordsList)

# class AddWordPanel(wx.Panel):
#     categoriesCheckBoxes = []

#     def __init__(self, parent):
#         super().__init__(parent)
#         titleFont = getTitleFont()
        
#         # Logo
#         self.sizer = wx.BoxSizer(wx.VERTICAL)
#         self.sizer.Add(getLogo(self), 0, wx.ALL | wx.CENTER, 5)

#         # Insert: word
#         wordSizer = wx.BoxSizer(wx.HORIZONTAL)
#         self.sizer.Add(wordSizer, 0, wx.ALL | wx.CENTER, 5)
#         wordText = wx.StaticText(self, label="Word: ")
#         wordText.SetFont(titleFont)
#         wordSizer.Add(wordText, 0, wx.ALL, 5)
#         self.wordTextBox = wx.TextCtrl(self, size=(100, -1))
#         wordSizer.Add(self.wordTextBox, 0, wx.ALL, 5)

#         # Insert: translation
#         translationSizer = wx.BoxSizer(wx.HORIZONTAL)
#         self.sizer.Add(translationSizer, 0, wx.ALL | wx.CENTER, 5)
#         translationText = wx.StaticText(self, label="Hebrew translation: ")
#         translationText.SetFont(titleFont)
#         translationSizer.Add(translationText, 0, wx.ALL, 5)
#         self.translationTextBox = wx.TextCtrl(self, size=(300, -1))
#         translationSizer.Add(self.translationTextBox, 0, wx.ALL, 5)

#         # Insert: sentence
#         sentenceSizer = wx.BoxSizer(wx.HORIZONTAL)
#         self.sizer.Add(sentenceSizer, 0, wx.ALL | wx.CENTER, 5)
#         sentenceText = wx.StaticText(self, label="Example sentence: ")
#         sentenceText.SetFont(titleFont)
#         sentenceSizer.Add(sentenceText, 0, wx.ALL, 5)
#         self.sentenceTextBox = wx.TextCtrl(self, size=(300, -1))
#         sentenceSizer.Add(self.sentenceTextBox, 0, wx.ALL, 5)

#         # Insert: category
#         self.categorySizer = wx.BoxSizer(wx.HORIZONTAL)
#         self.sizer.Add(self.categorySizer, 0, wx.ALL | wx.CENTER, 5)
#         self.updateCategoriesCheckBoxes()

#         # Send button
#         sendButton = wx.Button(self, label='Send')
#         self.sizer.Add(sendButton, 0, wx.ALL | wx.CENTER, 5)
#         sendButton.Bind(wx.EVT_BUTTON, self.addWordOnPress)  # pressing 'send' button
#         self.Bind(wx.EVT_TEXT_ENTER, self.addWordOnPress) # pressing 'enter' key

#         self.SetSizer(self.sizer)
    
#     def updateCategoriesCheckBoxes(self):
#         self.categorySizer.Clear(True)
#         categoryText = wx.StaticText(self, label="Category: ")
#         categoryText.SetFont(getTitleFont())
#         self.categorySizer.Add(categoryText, 0, wx.ALL, 5)
#         categoriesList = db.getAllCategories()
#         for category in categoriesList:
#             self.categoriesCheckBoxes.append(wx.CheckBox(self, label=category[1]))
#             self.categorySizer.Add(self.categoriesCheckBoxes[-1], 0, wx.ALL, 5)

#     def addWordOnPress(self, event):
#         word = self.wordTextBox.GetValue()
#         translation = self.translationTextBox.GetValue()
#         sentence = self.sentenceTextBox.GetValue()

#         categories = ""
#         for checkBox in self.categoriesCheckBoxes:
#             if checkBox.GetValue():
#                 categories += checkBox.GetLabel() + ','
#                 checkBox.SetValue(False)
#         if categories != "":
#             categories = categories[:-1] # remove last comma
        
#         db.insertWord(word, translation, sentence, categories)
#         self.wordTextBox.Clear()
#         self.translationTextBox.Clear()
#         self.sentenceTextBox.Clear()

# class AddCategoryPanel(wx.Panel):
#     def __init__(self, parent):
#         super().__init__(parent)
#         titleFont = getTitleFont()
        
#         # Logo
#         self.sizer = wx.BoxSizer(wx.VERTICAL)
#         self.sizer.Add(getLogo(self), 0, wx.ALL | wx.CENTER, 5)

#         # Insert: category
#         categorySizer = wx.BoxSizer(wx.HORIZONTAL)
#         self.sizer.Add(categorySizer, 0, wx.ALL | wx.CENTER, 5)
#         categoryText = wx.StaticText(self, label="Category name: ")
#         categoryText.SetFont(titleFont)
#         categorySizer.Add(categoryText, 0, wx.ALL, 5)
#         self.categoryTextBox = wx.TextCtrl(self, size=(100, -1))
#         categorySizer.Add(self.categoryTextBox, 0, wx.ALL, 5)

#         # Send button
#         sendButton = wx.Button(self, label='Add')
#         self.sizer.Add(sendButton, 0, wx.ALL | wx.CENTER, 5)
#         sendButton.Bind(wx.EVT_BUTTON, self.addCategoryOnPress)

#         self.SetSizer(self.sizer)
    
#     def addCategoryOnPress(self, event):
#         category = self.categoryTextBox.GetValue()
#         db.insertCategory(category)
#         self.categoryTextBox.Clear()
#         frame.refreshPanels()
#         print("Category added!")

class BaseFrame(wx.Frame):
    # panels enums:
    SEARCH_PANEL = 1
    # ADD_WORD_PANEL = 2
    # ADD_CATEGORY_PANEL = 3
    
    def __init__(self):
        super().__init__(parent=None, title='Artictionary', size=(650,600))
        self.SetBackgroundColour(wx.Colour(255, 255, 255))
        #self.SetIcon(wx.Icon("icon.png"))
        self.Centre()

        self.searchPanel = SearchPanel(self)
        # self.AddWordPanel = AddWordPanel(self)
        # self.AddCategoryPanel = AddCategoryPanel(self)
        # self.AddWordPanel.Hide()
        # self.AddCategoryPanel.Hide()

        # Order between panels
        self.panelsSizer = wx.BoxSizer(wx.VERTICAL)
        self.panelsSizer.Add(self.searchPanel, 1, wx.EXPAND)
        # self.panelsSizer.Add(self.AddWordPanel, 1, wx.EXPAND)
        # self.panelsSizer.Add(self.AddCategoryPanel, 1, wx.EXPAND)
        self.SetSizer(self.panelsSizer)

        # Menu bar
        # menuBar = wx.MenuBar()
        # optionsMenu = wx.Menu()

        # # Search word panel
        # searchWordItem = wx.MenuItem(optionsMenu, id=self.SEARCH_PANEL, text="Search word")
        # optionsMenu.Append(searchWordItem)

        # # Add new word panel
        # newWordItem = wx.MenuItem(optionsMenu, id=self.ADD_WORD_PANEL, text="Add new word") 
        # optionsMenu.Append(newWordItem)

        # # Add new category panel
        # newCategoryItem = wx.MenuItem(optionsMenu, id=self.ADD_CATEGORY_PANEL, text="Add new category")
        # optionsMenu.Append(newCategoryItem)

        # menuBar.Append(optionsMenu, "Options")
        # self.SetMenuBar(menuBar)
        # self.Bind(wx.EVT_MENU, self.menuBarHandler)

    # def menuBarHandler(self, event): 
    #     id = event.GetId()
    #     # show the panel that was selected, hide the rest
    #     if id == self.SEARCH_PANEL:
    #         self.AddWordPanel.Hide()
    #         self.AddCategoryPanel.Hide()
    #         self.searchPanel.Show()
    #         self.Layout()
    #         self.Refresh()
    #     if id == self.ADD_WORD_PANEL:
    #         self.searchPanel.Hide()
    #         self.AddCategoryPanel.Hide()
    #         self.AddWordPanel.Show()
    #         self.Layout()
    #         self.Refresh()
    #     if id == self.ADD_CATEGORY_PANEL:
    #         self.searchPanel.Hide()
    #         self.AddWordPanel.Hide()
    #         self.AddCategoryPanel.Show()
    #         self.Layout()
    #         self.Refresh()

    # def refreshPanels(self):
    #     self.searchPanel.updateFilterCategories()
    #     self.searchPanel.Refresh()
    #     self.AddWordPanel.updateCategoriesCheckBoxes()
    #     self.AddWordPanel.Refresh()
    #     self.AddCategoryPanel.Refresh()

if __name__ == '__main__':
    app = wx.App()
    #db = ArtictionaryDatabase()
    frame = BaseFrame()
    frame.Show()
    app.MainLoop()