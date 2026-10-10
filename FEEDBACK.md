# Feedback(2026-09-10):

## General:
- Przydałoby się info o tym jak to uruchomić w reaadme, to że trzeba sobie odpalić jakiś serwer do .js bo inaczej sypie errorami CORS itd. Można też ułatwić cały setup robiąc package.json i jakiś podstawowy skrypt, np. 'run' albo 'dev'.
- Fajnie byłoby się trzymać jednego języka, ograniczyć literówki, przynajmniej w takich miejscach jak nazwy plików :)


## Tech: 
- Nazewnictwo zmiennych jest trochę all over the place, czasem camelCase, czasem PascalCase, dobrze jest trzymać się jednego, jakikolwiek byś nie wybrał(a najlepiej jakiegoś uznawanego za standard np. https://google.github.io/styleguide/jsguide.html)
- Bazowanie logiki gry na pixelach jest sprytne ale generalnie bardzo no-no. Jeśli ktoś uruchomi to na hi-dpi monitorze, albo zmieni rozmiar okna itd., to wszystko przestanie działać. Dobrym zwyczajem jest całkowite oddzielenie logiki od warstwy wyświetlania(frontu). To front powinien decydować o tym co, jak i gdzie jest wyświetlane, natomiast logika gry nie powinna mieć pojęcia o wielkości szachownicy w pixelach, o kolorach, wielkości konkretnych pól itd. 
- Klasy, wiem że niewiele tego poruszaliście w szkole ale jakiego języka byście nie używali w przyszłości, musicie rozumieć klasy i obiektowość.W przypadku js klasy to twór taki trochę upośledzony ale od jakiegoś czasu coś tam jednak w tym kierunku powstało, nie bez powodu praktycznie nikt już czystego Js nie używa, kosztem Typescriptu. Nie mam dobrego źródła do takiej wiedzy ale myślę, że warto generalnie przejść przez dany język na Exercism, nauczyłem się z tym podstaw kilku języków w przeszłości: https://exercism.org/tracks/javascript/concepts/classes Jak ogarniesz to, to pewne rzeczy(np. oddzielenie logiki gry od wyświetlania) może stać się nieco bardziej oczywiste. W tym przypadku praktycznie wszystko powinno być klasą, Ruch, Gracz, Pionek, Szachownica, dodatkowo coś pokroju np. GameManagera który ogarnia 'zasady', zlicza wynik/warunki wygranej/czas itd. Osobną klasą może być także kod który odpowiada za zapisywanie stanu rozgrywki, wtedy każdy Pionek, czy Szachownica nie muszą 'wiedzieć' jak to robić.
- Logiki samych ruchów nie sprawdzałem bo nie umiem jak na ironię grać w szachy, mogę to przelecieć Claudem jak będziesz jak chciał.
- Unikałbym ręcznego zmieniania styli elementów z poziomu .js jeśli nie musisz. Bardzo ciężko będzie Ci później 'odbudować' stan danej gry jak będziesz chciał dodać Save/Load czy grę online, albo po prostu próbował ogarnąć dlaczego stało się coś dziwnego po np. 30 ruchach, bo będziesz musiał je wszystkie odtworzyć.

## UX/UI:
- Przycisk nie ma labelki czy swojego stanu, ciężko powiedzieć co się dzieje gdy się klika, ale domyślam się, że to 'work in progress'
- Drag and drop dla ruchów byłby fajnym ficzerem
- Może dodać tryb liczenia czasu dla każdej tury?
- Jakiś efekt wskazujący na to którego gracza jest aktualnie tura, ciężko to ogarnąć na pierwszy rzut oka w tej chwili
- Fajnie byłoby ogarnąć interfejs tak by działał też na mniejszym ekranie(np telefonu), czy węższym ekranie
