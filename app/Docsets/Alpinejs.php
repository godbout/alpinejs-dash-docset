<?php

namespace App\Docsets;

use Godbout\DashDocsetBuilder\Docsets\BaseDocset;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Wa72\HtmlPageDom\HtmlPageCrawler;

class Alpinejs extends BaseDocset
{
    public const CODE = 'alpinejs';
    public const NAME = 'AlpineJS';
    public const URL = 'github.com';
    public const INDEX = 'alpinejs/alpine';
    public const PLAYGROUND = '';
    public const ICON_16 = '../../icons/icon.png';
    public const ICON_32 = '../../icons/icon@2x.png';
    public const EXTERNAL_DOMAINS = [
        'githubassets.com',
        'githubusercontent.com',
    ];


    public function grab(): bool
    {
        $toIgnore = implode('|', [
            '/blame',
            '/blob',
        ]);

        $toGet = implode('|', [
            '.*\.githubusercontent\.com',
           '\.css',
            '\.ico',
            '\.js',
            '\.png',
            '\.svg',
            '/css',
        ]);

        system(
            "echo; wget github.com/alpinejs/alpine \
                --mirror \
                --trust-server-names \
                --reject-regex='{$toIgnore}' \
                --accept-regex='{$toGet}' \
                --ignore-case \
                --page-requisites \
                --adjust-extension \
                --convert-links \
                --span-hosts \
                --domains={$this->externalDomains()} \
                --directory-prefix=storage/{$this->downloadedDirectory()} \
                -e robots=off \
                --quiet \
                --show-progress",
            $result
        );

        return $result === 0;
    }

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
