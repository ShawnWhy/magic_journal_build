import os
current_dir = os.path.dirname(os.path.abspath(__file__))
print(current_dir)
folder = os.path.join(current_dir, r"minor-arcana\cup")
print("folder" + folder)

strings = ["ace of cups",
           "2 of cups",
           "3 of cups",
           "4 of cups",
           "5 of cups",
           "6 of cups",
           "7 of cups",
           "8 pf cups",
           "9 of cups",
           "10 of cups",
           "page of cups",
           "knight of cups",
           "queen of cups",
           "king of cups"
           ]

filenames = os.listdir(folder)
# sort the filenames numerically
filenames.sort(key=lambda x: int(x.split(".")[0]))
for (i, filename) in enumerate(filenames):
    os.rename(os.path.join(folder, filename), strings[i]+".jpg")
