<?php

namespace App\Docsets;

use Godbout\DashDocsetBuilder\Docsets\BaseDocset;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Wa72\HtmlPageDom\HtmlPageCrawler;

class Alpinejs extends BaseDocset
{
    public const CODE = 'alpinejs';
    public const NAME = 'Alpinejs';
    public const URL = 'github.com/alpinejs/alpine';
    public const INDEX = 'https://github.com/alpinejs/alpine';
    public const PLAYGROUND = '';
    public const ICON_16 = 'favicon-16x16.png';
    public const ICON_32 = 'favicon-32x32.png';
    public const EXTERNAL_DOMAINS = [];


    public function entries(string $file): Collection
    {
        $crawler = HtmlPageCrawler::create(Storage::get($file));

        $entries = collect();

        //

        return $entries;
    }

    public function format(string $file): string
    {
        $crawler = HtmlPageCrawler::create(Storage::get($file));

        //

        return $crawler->saveHTML();
    }
}
