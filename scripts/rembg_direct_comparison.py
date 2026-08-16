from pathlib import Path
import sys

from rembg import new_session, remove


source = Path(sys.argv[1])
output = Path(sys.argv[2])
model_name = sys.argv[3] if len(sys.argv) > 3 else "u2netp"
session = new_session(model_name)
with source.open("rb") as file:
    output.write_bytes(remove(file.read(), session=session))
