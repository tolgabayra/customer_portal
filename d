from pytube import YouTube
import os


yt = YouTube(
	str(input("Youtube mp3 url link yapistir: \n>> ")))

video = yt.streams.filter(only_audio=True).first()

print("Klasor Adini Yaziniz (Secili klasor icine indirilir)")
destination = str(input(">> ")) or '.'

out_file = video.download(output_path=destination)


base, ext = os.path.splitext(out_file)
new_file = base + '.mp3'
os.rename(out_file, new_file)


print(yt.title + "mp3 indirme basarili.")
#tolgabayrak
