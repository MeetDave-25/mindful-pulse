# Manual Installation Guide for psycopg2-binary

## Problem
There's a persistent pip installation error on your system. We need to install `psycopg2-binary` to connect to PostgreSQL.

## Solution Options

### Option 1: Download and Install Wheel File Manually

1. **Download the wheel file** for Python 3.13 on Windows:
   - Go to: https://pypi.org/project/psycopg2-binary/#files
   - Download: `psycopg2_binary-2.9.9-cp313-cp313-win_amd64.whl`
   - Or use this direct link: https://files.pythonhosted.org/packages/psycopg2_binary/psycopg2_binary-2.9.9-cp313-cp313-win_amd64.whl

2. **Install the wheel file**:
   ```powershell
   cd Downloads  # or wherever you downloaded it
   python -m pip install psycopg2_binary-2.9.9-cp313-cp313-win_amd64.whl
   ```

### Option 2: Fix pip and Install Normally

Try fixing pip first:

```powershell
# Method 1: Reinstall pip
python -m ensurepip --upgrade

# Method 2: Download get-pip.py
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python get-pip.py

# Then try installing again
python -m pip install psycopg2-binary
```

### Option 3: Use Alternative PostgreSQL Driver

If psycopg2-binary continues to fail, we can use `psycopg` (version 3):

```powershell
python -m pip install "psycopg[binary]"
```

Then update `d:\burnout\backend\database.py` line 1:
```python
# Change the import if using psycopg3
# No code changes needed - it's compatible!
```

## After Installing

Once psycopg2-binary is installed, run:

```powershell
cd d:\burnout\backend
python init_db.py
```

This will create all the database tables on Railway.

## Verify Installation

Check if psycopg2 is installed:

```powershell
python -c "import psycopg2; print(psycopg2.__version__)"
```

You should see the version number (e.g., `2.9.9`).
