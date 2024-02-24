
from threading import Thread


def keep_alive():
  t = Thread(target=run)
  t.start()
