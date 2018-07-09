import pytest


def test_get_cmap():
    from terracotta.cmaps import get_cmap
    cmap = get_cmap('jet')
    assert cmap.shape[0] > 0
    assert cmap.shape[1] == 4


def test_get_cmap_filesystem(monkeypatch):
    import pkg_resources
    import importlib

    import terracotta.cmaps

    def throw_error(*args, **kwargs):
        raise pkg_resources.DistributionNotFound('monkeypatched')

    with monkeypatch.context() as m:
        m.setattr(pkg_resources.Requirement, 'parse', throw_error)

        with pytest.raises(pkg_resources.DistributionNotFound):
            pkg_resources.Requirement.parse('terracotta')

        importlib.reload(terracotta.cmaps)

        cmap = terracotta.cmaps.get_cmap('jet')
        assert cmap.shape[0] > 0
        assert cmap.shape[1] == 4
