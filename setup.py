import versioneer

from setuptools import setup, find_packages


setup(
    name='terracotta',
    version=versioneer.get_version(),
    cmdclass=versioneer.get_cmdclass(),
    description='A modern XYZ tile server written in Python',
    author='Philip Graae',
    author_email='phgr@dhigroup.com',
    packages=find_packages(),
    python_requires='>=3.5',
    setup_requires=['numpy'],
    install_requires=[
        'numpy',
        'flask',
        'click',
        'pillow',
        'mercantile',
        'rasterio>=1.0rc1',
        'cachetools',
        'tqdm',
        'toml'
    ],
    entry_points='''
        [console_scripts]
        terracotta=terracotta.scripts.cli:cli
    ''',
    extras_require={
        'test': [
            'pytest>=3.5',
            'pytest-cov',
            'pytest-mypy',
            'pytest-flake8',
            'codecov',
            'attrs>=17.4.0',
            'matplotlib'
        ]
    },
    include_package_data=True,
    package_data={
        'terracotta': [
            'cmaps/*.txt',  # colormaps
            'templates/*.html', 'static/*.js', 'static/*.css', 'static/images/*.png'  # preview app
        ]
    }
)
